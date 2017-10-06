class MetricaController < ApplicationController


  def update
    location = params['location']
    metrica = Metrica.find_or_create_by(pagina: location)
    metrica.increment!(:cantidad_descargas)
    render :json => metrica.cantidad_descargas
  end

end