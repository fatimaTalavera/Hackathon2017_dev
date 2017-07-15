#
#autores
#Fatima Talavera fa.talavera95@gmail.com
#Jerson Paniagua diazpany@gmail.com
#
class WelcomeController < ApplicationController
  def index
    #select codigodepartamento, avg(montovigente) as prom_monto_vigente, avg(montoplanfinancierovigente) as prom_montoplanfinancierovigente, avg(montoejecutado) as prom_montoejecutado, avg(montotransferido) as prom_montotransferido, avg(montopagado) as prom_montopagado from pgn_gasto group by codigodepartamento order by codigodepartamento asc
    pgn_months_query = "select mes from pgn_gasto group by mes order by mes desc"
    @pgn_months = ActiveRecord::Base.connection.exec_query(pgn_months_query).rows

    pgn_years_query = "select anio from pgn_gasto group by anio order by anio desc"
    @pgn_years = ActiveRecord::Base.connection.exec_query(pgn_years_query).rows

    raw = 'select nombre, nivelid, entidadid from instituciones order by nombre'
    @inst = ActiveRecord::Base.connection.exec_query(raw).rows

    render 'welcome/index.html.erb', :locals => {  :@inst => @inst, :@pgn_months => @pgn_months, @pgn_years => @pgn_years}

  end
end
