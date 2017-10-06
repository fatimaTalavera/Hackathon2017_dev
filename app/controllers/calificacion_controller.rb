class CalificacionController < ApplicationController

  def update
    #algo
    calificacion = Calificacion.find_or_create_by(filtro: params[:filter], ip: params[:ip] )
    calificacion.update(puntaje: params[:rating])
    globalRate = Calificacion.where(filtro: params[:filter]).average("puntaje")
    render :json => [calificacion, globalRate]
  end

end