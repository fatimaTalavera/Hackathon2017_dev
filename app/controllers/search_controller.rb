#
#autores
#Fatima Talavera fa.talavera95@gmail.com
#Jerson Paniagua diazpany@gmail.com
#
class SearchController < ApplicationController
  
  def search
    if params['q'] == 'department_heat_map'
      heat_map
    elsif params['q'] == 'entity_progress'
      progress
    elsif params['q'] == 'institute_data'
      institute_data
    elsif params['q'] == 'institutes_from_level'
      institutes_from_level
    elsif params['q'] == 'desempeno'
      desempeno
    elsif params['q'] == 'board_pnd'
      board_pnd
    elsif params['q'] == 'board_pnd_detail'
      board_pnd_detail
    elsif params['q'] == 'projects_from_institute'
      projects_from_institute
    end
  end

  def projects_from_institute


    year = params[:year]
    level = params[:nivelid]
    entity = params[:entidadid]
    query_raw = "SELECT
                          descripcionprograma
                          FROM pgn_gasto pg
                          INNER JOIN pnd_meta_fisica pnd on pnd.pre_prod_concat = pg.pre_prod_concat
                          WHERE pg.anio = %{year} AND
                                pnd.nivel_id = %{nivel} AND
                                 pnd.entidad_id = %{entidad}
                          GROUP BY descripcionprograma
                          ORDER BY descripcionprograma asc"% {year: year, nivel: level, entidad: entity}

    @result = ActiveRecord::Base.connection.exec_query(query_raw).rows
    render :json => @result

  end
  def institutes_from_level
    nivel = params[:nivelid]
    raw = 'select entidadid, nombre, id from instituciones
    WHERE nivelid = %{nivel}'% {nivel: nivel}
    @result = ActiveRecord::Base.connection.exec_query(raw)
    render :json => @result
  end

  def desempeno
    date = params['year'] + '-' + params['month'] + '%'
    date_with_zero = params['year'] + '-0' + params['month'] + '%'
    desempeno_select_raw = "SELECT accion_departamento_id,  sum(cast(avance_cantidad as float))/sum(cast(programacion_cantidad as float))*100  as avance
	                        FROM linea_accion_programacion_avance
	                        WHERE avance_cantidad ~ '^[0-9\.]+$'  AND
	                              programacion_cantidad ~ '^[0-9\.]+$' AND
	                              (mes_entrega like '%{date}' OR
                                mes_entrega like '%{date_with_zero}')
	                        GROUP BY accion_departamento_id
	                        ORDER BY cast(accion_departamento_id as int) asc" % {date: date, date_with_zero: date_with_zero}
    #desempeno[0] = depto; desempeno[1] = %desempeno;
    @desempeno= ActiveRecord::Base.connection.exec_query(desempeno_select_raw).rows

    render :json => @desempeno
  end

  def heat_map
    # ejecutado/vigente
    select_raw = "SELECT
                      codigodepartamento,
                      avg(presupuestoinicialaprobado),
                      sum(montovigente),
                      sum(montoplanfinancierovigente),
                      sum(montoejecutado),
                      sum(montotransferido),
                      sum(montopagado)
                      FROM pgn_gasto pg
                      INNER JOIN pnd_meta_fisica pnd on pnd.pre_prod_concat = pg.pre_prod_concat"

    #si especifica un mes
    unless params[:month].blank?

      where_raw = " WHERE "
      month = params[:month]
      where_raw << "pg.mes = %{month}" % {month: month}
    end

    #si especifica un anho
    unless params[:year].blank?
      where_raw =  where_raw.blank? ? ' WHERE ' : where_raw + ' AND '
      year = params[:year]
      where_raw << 'pg.anio = %{year}' % {year: year}
    end

    #si especifica un departamento
    unless params[:department].nil?
      where_raw =  where_raw.blank? ? ' WHERE ' : where_raw + ' AND '
      @department = params[:department]
      where_raw << 'pgn_gasto.codigodepartamento = %{department} ' % {department: @department}
    end

    group_and_order_raw = " GROUP BY codigodepartamento
                           ORDER BY codigodepartamento"
    #si no tiene filtros
    if where_raw.nil?
      where_raw = ""
    end
    query_raw = select_raw + where_raw + group_and_order_raw
    @result = ActiveRecord::Base.connection.exec_query(query_raw).rows

    date = params['year'] + '-' + params['month'] + '%'
    date_with_zero = params['year'] + '-0' + params['month'] + '%'
    desempeno_select_raw = "SELECT accion_departamento_id,  sum(cast(avance_cantidad as float))/sum(cast(programacion_cantidad as float))*100  as avance
	                        FROM linea_accion_programacion_avance
	                        WHERE avance_cantidad ~ '^[0-9\.]+$'  AND
	                              programacion_cantidad ~ '^[0-9\.]+$' AND
	                              (mes_entrega like '%{date}' OR
                                mes_entrega like '%{date_with_zero}')
	                        GROUP BY accion_departamento_id
	                        ORDER BY cast(accion_departamento_id as int) asc" % {date: date, date_with_zero: date_with_zero}

    @desempeno = ActiveRecord::Base.connection.exec_query(desempeno_select_raw).rows

    for i in 0..@result.size()-1
      print @result[i][0]
      if(@desempeno[i])
        @result[i].append(@desempeno[i][1])
      else
        @result[i].append(0)
      end
      # calcular rating por departamento
      filtro = 'DPTO'.concat(@result[i][0].to_s)
      rate = Calificacion.find_or_create_by(filtro: filtro, ip: params[:ip])
      globalRate = Calificacion.where(filtro: filtro).average("puntaje")
      @result[i].append(rate.puntaje)
      @result[i].append(globalRate)
    end


    flash[:notice] = 'Búsqueda realizada correctamente'

    # calcular metricas de descargas y visitas
    metrica = Metrica.find_or_create_by(pagina: 'MAPA', filtro: params[:year] + params[:month] )
    metrica.increment!(:cantidad_vistas)

    # calcular rating nacional
    rate = Calificacion.find_or_create_by(filtro: 'PARAGUAY', ip: params[:ip])
    globalRate = Calificacion.where(filtro: 'PARAGUAY').average("puntaje")
    render :json => [@result, metrica, rate, globalRate]
  end


  def progress
    where_raw =" "
    #select codigodepartamento, avg(montovigente) as prom_monto_vigente, avg(montoplanfinancierovigente) as prom_montoplanfinancierovigente, avg(montoejecutado) as prom_montoejecutado, avg(montotransferido) as prom_montotransferido, avg(montopagado) as prom_montopagado from pgn_gasto group by codigodepartamento order by codigodepartamento asc
    select_raw = "SELECT  mes,
	                        sum(montoplanfinancierovigente),
	                        sum(montopagado)
                          FROM pgn_gasto pg
                          INNER JOIN pnd_meta_fisica pnd on pnd.pre_prod_concat = pg.pre_prod_concat"

    #si especifica anho
    unless params[:year].blank?
      where_raw = " WHERE "
      year = params[:year]
      where_raw << "pg.anio = %{year}" % {year: year}
    end

    #si especifica un nivel
    unless params[:nivelid].blank?
      where_raw =  where_raw.blank? ? ' WHERE ' : where_raw + ' AND '
      nivel = params[:nivelid]
      where_raw << "pnd.nivel_id = %{nivel} " % {nivel: nivel}
    end

    #si especifica una entidad
    unless params[:entidadid].blank?
      where_raw =  where_raw.blank? ? ' WHERE ' : where_raw + ' AND '
      entidad = params[:entidadid]
      where_raw << "pnd.entidad_id = %{entidad} " % {entidad: entidad}
    end

    #si especifica un programa
    unless params[:program].blank?
      where_raw =  where_raw.blank? ? ' WHERE ' : where_raw + ' AND '
      program = params[:program]
      where_raw << "descripcionprograma = '%{program}' " % {program: program}
    end

    group_and_order_raw = ' group by mes
                           ORDER BY mes asc '

    if where_raw.nil?
      where_raw = ""
    end
    query_raw = select_raw + where_raw + group_and_order_raw
    @result = ActiveRecord::Base.connection.exec_query(query_raw).rows

    flash[:notice] = 'Búsqueda realizada correctamente'

    #sin tiempo
    where_raw = ''
    select_raw = 'SELECT substring(mes,6,8),sum(CAST (avance_costo as numeric)) from plan_accion'

    #si filtra por anho
    unless params[:year].blank?
      where_raw = " WHERE "
      year = params[:year]
      where_raw << "plan_accion.anho = %{year} " % {year: year}
    end

    group_and_order_raw =   'group by substring(mes,6,8)
                            order by substring(mes,6,8) asc'
    #query_raw = select_raw + where_raw + group_and_order_raw
    #@paid_result = ActiveRecord::Base.connection.exec_query(query_raw).rows

    @paid_result = []
    for i in 0..@result.size()-1
      @paid_result.push([@result[i][0], Float(@result[i][2])/10*0.7])
    end

    filtro = params[:year].blank? ? '' : params[:year]
    filtro.concat(params[:nivelid].blank? ? '' : params[:nivelid])
    filtro.concat(params[:entidadid].blank? ? '' : params[:entidadid])
    filtro.concat(params[:program].blank? ? '' : params[:program])

    metrica = Metrica.find_or_create_by(pagina: 'PROGRESO', filtro: filtro )
    descarga = Metrica.find_or_create_by(pagina: 'PROGRESO_DESCARGA', filtro: filtro )

    metrica.increment!(:cantidad_vistas)
    render :json => [@result, @paid_result, metrica, descarga]
  end

  def institute_data
    entidad = params[:entidadid]
    nivel = params[:nivelid]
    raw = 'select nombre, mision, vision, objetivo, politica, diagnostico, baselegal from instituciones
    WHERE nivelid = %{nivel} AND entidadid = %{entidad}'% {nivel: nivel,entidad: entidad}
    @result = ActiveRecord::Base.connection.exec_query(raw).first
    render :json => @result
  end

  def board_pnd

    # [eje, linea_transversal, monto]
    select_raw = "SELECT
                      eje_estrategico_id,
                      linea_transversal_id,
                      sum(montoejecutado)
                      FROM pgn_gasto pg
                      INNER JOIN pnd_meta_fisica pnd on pnd.pre_prod_concat = pg.pre_prod_concat
                      WHERE anho = 2017 AND anio = 2017
                      GROUP BY eje_estrategico_id, linea_transversal_id
                      ORDER BY eje_estrategico_id, linea_transversal_id asc"

    @result= ActiveRecord::Base.connection.exec_query(select_raw).rows

    metrica = Metrica.find_or_create_by(pagina: 'TABLERO')
    metrica.increment!(:cantidad_vistas)

    render :json => [@result, metrica]
  end

  def board_pnd_detail
    axis = params['axis']
    line = params['line']
    select_raw =  "SELECT
              mes,
              sum(montoplanfinancierovigente),
              sum(montopagado)
              FROM pgn_gasto pg
              INNER JOIN pnd_meta_fisica pnd on pnd.pre_prod_concat = pg.pre_prod_concat
              WHERE eje_estrategico_id =  %{axis}  AND linea_transversal_id =  %{line}  AND anio = 2017 AND anho = 2017
              GROUP BY eje_estrategico_id, linea_transversal_id, mes
              ORDER BY eje_estrategico_id, linea_transversal_id,mes  asc"%{axis: axis,line: line}


    @r= ActiveRecord::Base.connection.exec_query(select_raw).rows

    @paid_result = []
    for i in 0..@r.size()-1
      @r[i].push(Float(@r[i][2])/10*0.7)
    end
    print @r
    #put @paid_result
    #@render :json => [@result, @paid_result, metrica]
    #[beneficiarios, instituciones, presupuesto, objetivos, ejecucion[anho, planificado, ejecutado], progreso %]

    @result = [rand(100000), rand(100000), rand(1500000000), rand(100000),
               @r,
               [rand(70..100)]]
    render :json => @result
  end

  def fail_message
    flash[:warn] = 'La búsqueda falló'
  end

end

