# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 0) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "nomina", id: false, force: :cascade do |t|
    t.integer "anio",                          null: false
    t.integer "mes",                           null: false
    t.string  "cedula",            limit: 256, null: false
    t.string  "apellidos_nombres", limit: 256, null: false
    t.string  "entidad",           limit: 256, null: false
    t.string  "categoria",         limit: 256, null: false
    t.string  "vinculo",           limit: 256, null: false
    t.string  "objeto_gasto",      limit: 256, null: false
    t.integer "monto",                         null: false
  end

  create_table "registro_titulos", id: false, force: :cascade do |t|
    t.integer "anio",                            null: false
    t.integer "mes",                             null: false
    t.string  "documento",           limit: 32,  null: false
    t.string  "nombre_completo",     limit: 256, null: false
    t.integer "carrera_id",                      null: false
    t.string  "carrera",             limit: 256, null: false
    t.integer "titulo_id",                       null: false
    t.string  "titulo",              limit: 256, null: false
    t.string  "numero_resolucion",   limit: 8,   null: false
    t.string  "fecha_resolucion",    limit: 16,  null: false
    t.integer "tipo_institucion_id",             null: false
    t.string  "tipo_institucion",    limit: 32,  null: false
    t.integer "institucion_id",                  null: false
    t.string  "institucion",         limit: 256, null: false
    t.string  "gobierno_actual",     limit: 2,   null: false
    t.string  "sexo",                limit: 8,   null: false
  end

end
