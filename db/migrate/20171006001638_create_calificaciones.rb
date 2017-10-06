class CreateCalificaciones < ActiveRecord::Migration[5.0]
  def change
    create_table :calificaciones do |t|
      t.string :ip
      t.string :filtro
      t.integer :puntaje, default: 0
      t.string :comentario

      t.timestamps
    end
  end
end
