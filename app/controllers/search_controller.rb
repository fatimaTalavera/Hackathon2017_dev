#
#autores
#Fatima Talavera fa.talavera95@gmail.com
#Jerson Paniagua diazpany@gmail.com
#
class SearchController < ApplicationController
  
  def search
    if params['q'] == 'map'
      map
    elsif params['q'] == 'pie_chart'
      pie_chart
    end
  end

  def map
    #select codigodepartamento, avg(montovigente) as prom_monto_vigente, avg(montoplanfinancierovigente) as prom_montoplanfinancierovigente, avg(montoejecutado) as prom_montoejecutado, avg(montotransferido) as prom_montotransferido, avg(montopagado) as prom_montopagado from pgn_gasto group by codigodepartamento order by codigodepartamento asc
    select_raw = "SELECT
                      codigodepartamento,
                      avg(presupuestoinicialaprobado),
                      avg(montovigente),
                      sum(montoplanfinancierovigente),
                      sum(montoejecutado),
                      sum(montotransferido),
                      sum(montopagado)
                      FROM pgn_gasto pg
                      INNER JOIN pnd_meta_fisica pnd on pnd.pre_prod_concat = pg.pre_prod_concat"

    unless params[:month].blank?
      where_raw = " WHERE "
      @month = params[:month]
      where_raw << "pgn_gasto.mes = %{month}" % {month: @month}
    end

    unless params[:department].nil?
      if where_raw.blank?
        where_raw = " WHERE "
      end
      @department = params[:department]
      where_raw << "pgn_gasto.codigodepartamento = %{department} " % {department: @department}
    end

    group_and_order_raw = " GROUP BY codigodepartamento
                           ORDER BY codigodepartamento "
    if where_raw.nil?
      where_raw = ""
    end
    query_raw = select_raw + where_raw + group_and_order_raw
    @result = ActiveRecord::Base.connection.exec_query(query_raw).rows
    flash[:notice] = 'Búsqueda realizada correctamente'
    render :json => @result
  end
  def progress
    where_raw =" "
    #select codigodepartamento, avg(montovigente) as prom_monto_vigente, avg(montoplanfinancierovigente) as prom_montoplanfinancierovigente, avg(montoejecutado) as prom_montoejecutado, avg(montotransferido) as prom_montotransferido, avg(montopagado) as prom_montopagado from pgn_gasto group by codigodepartamento order by codigodepartamento asc
    select_raw = "SELECT  mes,
	                        sum(montoplanfinancierovigente),
	                        sum(montopagado)
                          FROM pgn_gasto pg
                          INNER JOIN pnd_meta_fisica pnd on pnd.pre_prod_concat = pg.pre_prod_concat"

    unless params[:month].blank?
      where_raw = " WHERE "
      @month = params[:month]
      where_raw << "pg.mes = %{month}" % {month: @month}
    end

    unless params[:entidadid].nil?
      if where_raw.blank?
        where_raw = " WHERE "
      end
      @entidad = params[:entidadid]
      @nivel = params[:nivelid]
      where_raw << "pnd.nivel_id = %{nivel} and pnd.entidad_id = %{entidad} " % {nivel: @nivel,entidad: @entidad}
    end

    group_and_order_raw = " group by mes
                           ORDER BY mes asc "
    if where_raw.nil?
      where_raw = ""
    end
    query_raw = select_raw + where_raw + group_and_order_raw
    @result = ActiveRecord::Base.connection.exec_query(query_raw).rows

    flash[:notice] = 'Búsqueda realizada correctamente'

    #sin tiempo
    paid_query = 'SELECT substring(mes,6,8),sum(CAST (avance_costo as numeric)) from plan_accion
                  where anho = 2017
                  group by substring(mes,6,8)
                  order by substring(mes,6,8) asc'
    @paid_result = ActiveRecord::Base.connection.exec_query(paid_query).rows

    render :json => [@result, @paid_result]
  end


  def maa
    #select codigodepartamento, avg(montovigente) as prom_monto_vigente, avg(montoplanfinancierovigente) as prom_montoplanfinancierovigente, avg(montoejecutado) as prom_montoejecutado, avg(montotransferido) as prom_montotransferido, avg(montopagado) as prom_montopagado from pgn_gasto group by codigodepartamento order by codigodepartamento asc
    select_raw = "SELECT
                      codigoDepartamento,
                      avg(montoVigente) as prom_monto_vigente,
                      avg(montoPlanFinancieroVigente) as prom_montoplanfinancierovigente,
                      avg(montoEjecutado) as prom_montoejecutado,
                      avg(montoTransferido) as prom_montotransferido,
                      avg(montoPagado) as prom_montopagado
                  FROM  pgn_gasto "
    where_raw = ""

    unless params[:month].blank?
      where_raw = "WHERE "
      @month = params[:month]
      where_raw << "pgn_gasto.mes = %{month} " % {month: @month}
    end

    group_and_order_raw = "GROUP BY codigoDepartamento
                           ORDER BY codigoDepartamento"
    query_raw = select_raw + where_raw + group_and_order_raw
    @result = ActiveRecord::Base.connection.exec_query(query_raw).rows
    flash[:notice] = 'Búsqueda realizada correctamente'
    print @result
    render :json => @result
  end


  def intitution_data
    raw = 'select name, nivelid, entidadid from instituciones order by name'
    @result = ActiveRecord::Base.connection.exec_query(raw).rows
    render :json => @inst
  end


  def fail_message
    flash[:warn] = 'La búsqueda falló'
  end

end

