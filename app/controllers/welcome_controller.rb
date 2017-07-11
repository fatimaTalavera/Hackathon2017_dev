#
#autores
#Fatima Talavera fa.talavera95@gmail.com
#Jerson Paniagua diazpany@gmail.com
#
class WelcomeController < ApplicationController
  def index
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

    raw = 'select nombre, nivelid, entidadid from instituciones order by nombre'
    @inst = ActiveRecord::Base.connection.exec_query(raw).rows


    render 'welcome/index.html.erb', :locals => { :@result => @result, :@inst => @inst}

  end
end
