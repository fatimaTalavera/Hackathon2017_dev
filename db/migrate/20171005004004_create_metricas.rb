class CreateMetricas < ActiveRecord::Migration[5.0]
  def change
    create_table :metricas do |t|
      t.string :pagina
      t.integer :cantidad_descargas, default: 0
      t.integer :cantidad_vistas, default: 0
      t.string :filtro

      t.timestamps
    end
  end
end
