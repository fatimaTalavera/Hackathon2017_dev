class CalificacionController < ApplicationController

  def update
    #algo
    calificacion = Calificacion.find_or_create_by(filtro: params[:filter] )
    calificacion.increment!(:puntaje)

    render :json => calificacion
  end

end