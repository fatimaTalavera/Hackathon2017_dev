#
#autores
#Fatima Talavera fa.talavera95@gmail.com
#Jerson Paniagua diazpany@gmail.com
#
class WelcomeController < ApplicationController
  def index
    #select codigodepartamento, avg(montovigente) as prom_monto_vigente, avg(montoplanfinancierovigente) as prom_montoplanfinancierovigente, avg(montoejecutado) as prom_montoejecutado, avg(montotransferido) as prom_montotransferido, avg(montopagado) as prom_montopagado from pgn_gasto group by codigodepartamento order by codigodepartamento asc
    pgn_years_query = "select anio from pgn_gasto group by anio order by anio desc"
    @pgn_years = ActiveRecord::Base.connection.exec_query(pgn_years_query).rows

    pgn_months_query = "select mes from pgn_gasto where anio= %{year} group by mes order by mes desc"% {year: @pgn_years.first[0]}
    @pgn_months = ActiveRecord::Base.connection.exec_query(pgn_months_query).rows

    institutes_query = 'select nombre, nivelid, entidadid from instituciones order by nombre'
    @inst = ActiveRecord::Base.connection.exec_query(institutes_query).rows

    pnd_meta_fisica_years_query = 'select anho from pnd_meta_fisica group by anho order by anho desc'
    @pnd_years = ActiveRecord::Base.connection.exec_query(pnd_meta_fisica_years_query).rows

    render 'welcome/index.html.erb', :locals => {  :@inst => @inst, :@pgn_months => @pgn_months, @pgn_years => @pgn_years, @pnd_years => @pnd_years}
  end

  def send_contact_email
    ContactMailer.contact_email(params).deliver
    flash[:info] = 'Gracias por ponerse en contacto con nosotros, le responderemos en las próximas 24hs'
    print 'asdad'
    print params[:email]
    print 'asdad'
  end
end
