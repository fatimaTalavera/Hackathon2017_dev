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

ActiveRecord::Schema.define(version: 20171005004004) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accion_producto", id: false, force: :cascade do |t|
    t.integer "id",                            null: false
    t.integer "proporcion",                    null: false
    t.integer "accionid",                      null: false
    t.integer "sprproductoid",                 null: false
    t.integer "nivel",                         null: false
    t.integer "entidad",                       null: false
    t.integer "tipoprograma",                  null: false
    t.integer "programa",                      null: false
    t.integer "subprograma",                   null: false
    t.integer "proyecto",                      null: false
    t.integer "anho",                          null: false
    t.integer "version",                       null: false
    t.string  "unidadmedida",       limit: 64, null: false
    t.decimal "cantidadfisica",                null: false
    t.string  "clase",              limit: 1,  null: false
    t.decimal "cantidadfinanciera",            null: false
    t.decimal "totalasignacion",               null: false
    t.string  "borrado",            limit: 8,  null: false
    t.string  "the_geom",           limit: 1,  null: false
    t.integer "cartodb_id",                    null: false
    t.string  "created_at",         limit: 32, null: false
    t.string  "updated_at",         limit: 32, null: false
    t.integer "pre_prod_concat"
    t.index ["accionid"], name: "accion_producto_accion_id", using: :btree
    t.index ["sprproductoid"], name: "accion_producto_product_id", using: :btree
  end

  create_table "avance", id: false, force: :cascade do |t|
    t.integer "ins_id",                           null: false
    t.string  "sigla",               limit: 16,   null: false
    t.integer "ins_ver",                          null: false
    t.string  "ins_borr",            limit: 1,    null: false
    t.integer "la_id",                            null: false
    t.string  "la_nombre",           limit: 128,  null: false
    t.integer "la_est_id",                        null: false
    t.integer "la_tipo_id",                       null: false
    t.integer "la_um_id",                         null: false
    t.string  "la_um_descp",         limit: 32,   null: false
    t.string  "la_ver",              limit: 1,    null: false
    t.string  "la_borr",             limit: 1,    null: false
    t.integer "ila_id",                           null: false
    t.integer "periodo",                          null: false
    t.integer "ila_meta",                         null: false
    t.integer "ila_ver",                          null: false
    t.string  "ila_borr",            limit: 1,    null: false
    t.integer "accion_id",                        null: false
    t.decimal "accion_peso",                      null: false
    t.integer "ac_id",                            null: false
    t.string  "ac_nombre",           limit: 128,  null: false
    t.integer "ac_um_id",                         null: false
    t.string  "ac_um_descp",         limit: 32,   null: false
    t.string  "accion_fecha_ini",    limit: 16,   null: false
    t.string  "accion_fecha_fin",    limit: 16,   null: false
    t.integer "depto_id",                         null: false
    t.string  "depto_nombre",        limit: 16,   null: false
    t.integer "dist_id",                          null: false
    t.string  "dist_nombre",         limit: 32,   null: false
    t.decimal "m1",                               null: false
    t.decimal "m2",                               null: false
    t.decimal "m3",                               null: false
    t.decimal "m4",                               null: false
    t.integer "ac_ver",                           null: false
    t.string  "ac_borr",             limit: 1,    null: false
    t.integer "accion_ver",                       null: false
    t.string  "accion_bor",          limit: 1,    null: false
    t.integer "crono_id",                         null: false
    t.string  "crono_nombre",        limit: 256,  null: false
    t.string  "crono_descp",         limit: 1024, null: false
    t.decimal "crono_prop",                       null: false
    t.decimal "crono_peso",                       null: false
    t.integer "crono_ver",                        null: false
    t.string  "crono_borr",          limit: 1,    null: false
    t.integer "crono_um_id",                      null: false
    t.string  "crono_um_descp",      limit: 32,   null: false
    t.integer "crono_tipo_id",                    null: false
    t.string  "crono_tipo_nombre",   limit: 16,   null: false
    t.string  "acumula",             limit: 1,    null: false
    t.integer "avance_id",                        null: false
    t.string  "avance_fecha",        limit: 16,   null: false
    t.decimal "avance_cant",                      null: false
    t.string  "avance_just",         limit: 8192, null: false
    t.string  "avance_borr",         limit: 1,    null: false
    t.string  "distrito_avance",     limit: 32,   null: false
    t.string  "departamento_avance", limit: 16,   null: false
  end

  create_table "destinatarios_avances", id: false, force: :cascade do |t|
    t.integer "nivel_id",                                       null: false
    t.string  "nivel_nombre",                      limit: 64,   null: false
    t.integer "entidad_id",                                     null: false
    t.string  "entidad_nombre",                    limit: 128,  null: false
    t.integer "tipo_presupuesto_id",                            null: false
    t.string  "tipo_presupuesto_nombre",           limit: 64,   null: false
    t.integer "programa_id",                                    null: false
    t.string  "programa_nombre",                   limit: 64,   null: false
    t.integer "subprograma_id",                                 null: false
    t.string  "subprograma_nombre",                limit: 128,  null: false
    t.integer "proyecto_id",                                    null: false
    t.string  "proyecto_nombre",                   limit: 64,   null: false
    t.integer "producto_id",                                    null: false
    t.string  "producto_nombre",                   limit: 128,  null: false
    t.integer "catalogo_destinatario_id",                       null: false
    t.string  "catalogo_destinatario_nombre",      limit: 64,   null: false
    t.string  "catalogo_destinatario_descripcion", limit: 1,    null: false
    t.integer "tipo_catalogo_destinatario_id",                  null: false
    t.string  "tipo_catalogo_destinatario_nombre", limit: 64,   null: false
    t.integer "departamento_id",                                null: false
    t.string  "departamento_nombre",               limit: 16,   null: false
    t.decimal "cantidad",                                       null: false
    t.string  "descripcion",                       limit: 1024, null: false
  end

  create_table "ejecucion_planes", id: false, force: :cascade do |t|
    t.string  "institucion",           limit: 16,   null: false
    t.integer "la_id",                              null: false
    t.string  "linea_accion",          limit: 128,  null: false
    t.string  "la_unidad",             limit: 32,   null: false
    t.integer "anho",                               null: false
    t.integer "la_meta",                            null: false
    t.integer "a_id",                               null: false
    t.string  "accion",                limit: 128,  null: false
    t.decimal "a_peso",                             null: false
    t.string  "a_unidad",              limit: 32,   null: false
    t.integer "depto_id",                           null: false
    t.string  "departamento",          limit: 16,   null: false
    t.integer "dist_id",                            null: false
    t.string  "distrito",              limit: 32,   null: false
    t.integer "crono_id",                           null: false
    t.string  "cronograma",            limit: 256,  null: false
    t.string  "crono_descripcion",     limit: 1024, null: false
    t.decimal "contribucion",                       null: false
    t.decimal "influencia",                         null: false
    t.string  "crono_unidad",          limit: 32,   null: false
    t.string  "crono_tipo",            limit: 16,   null: false
    t.integer "crono_tipo_id",                      null: false
    t.string  "crono_acumula",         limit: 1,    null: false
    t.string  "fecha",                 limit: 16,   null: false
    t.string  "mes",                   limit: 8,    null: false
    t.string  "programacion_cantidad", limit: 16,   null: false
    t.decimal "avance_cantidad",                    null: false
    t.string  "justificacion",         limit: 8192, null: false
    t.string  "avance_costo",          limit: 16,   null: false
    t.string  "avance_destinatarios",  limit: 8,    null: false
    t.string  "avance_evidencias",     limit: 2,    null: false
    t.string  "distrito_avance",       limit: 32,   null: false
    t.string  "departamento_avance",   limit: 16,   null: false
  end

  create_table "entidades", id: false, force: :cascade do |t|
    t.integer "nivel",                     null: false
    t.integer "entidad",                   null: false
    t.string  "nombreentidad", limit: 128, null: false
    t.string  "abreventidad",  limit: 64,  null: false
    t.string  "the_geom",      limit: 1,   null: false
    t.integer "cartodb_id",                null: false
    t.string  "created_at",    limit: 32,  null: false
    t.string  "updated_at",    limit: 32,  null: false
  end

  create_table "evidencia_avance", id: false, force: :cascade do |t|
    t.integer "ins_id",                         null: false
    t.string  "sigla",             limit: 16,   null: false
    t.integer "ins_ver",                        null: false
    t.string  "ins_borr",          limit: 1,    null: false
    t.integer "la_id",                          null: false
    t.string  "la_nombre",         limit: 64,   null: false
    t.integer "la_est_id",                      null: false
    t.integer "la_tipo_id",                     null: false
    t.integer "la_um_id",                       null: false
    t.string  "la_um_descp",       limit: 32,   null: false
    t.string  "la_ver",            limit: 1,    null: false
    t.string  "la_borr",           limit: 1,    null: false
    t.integer "ila_id",                         null: false
    t.integer "periodo",                        null: false
    t.integer "ila_meta",                       null: false
    t.integer "ila_ver",                        null: false
    t.string  "ila_borr",          limit: 1,    null: false
    t.integer "accion_id",                      null: false
    t.decimal "accion_peso",                    null: false
    t.integer "ac_id",                          null: false
    t.string  "ac_nombre",         limit: 128,  null: false
    t.integer "ac_um_id",                       null: false
    t.string  "ac_um_descp",       limit: 32,   null: false
    t.string  "accion_fecha_ini",  limit: 16,   null: false
    t.string  "accion_fecha_fin",  limit: 16,   null: false
    t.integer "depto_id",                       null: false
    t.string  "depto_nombre",      limit: 16,   null: false
    t.integer "dist_id",                        null: false
    t.string  "dist_nombre",       limit: 32,   null: false
    t.decimal "m1",                             null: false
    t.decimal "m2",                             null: false
    t.decimal "m3",                             null: false
    t.decimal "m4",                             null: false
    t.integer "ac_ver",                         null: false
    t.string  "ac_borr",           limit: 1,    null: false
    t.integer "accion_ver",                     null: false
    t.string  "accion_bor",        limit: 1,    null: false
    t.integer "crono_id",                       null: false
    t.string  "crono_nombre",      limit: 256,  null: false
    t.string  "crono_descp",       limit: 1024, null: false
    t.decimal "crono_prop",                     null: false
    t.decimal "crono_peso",                     null: false
    t.integer "crono_ver",                      null: false
    t.string  "crono_borr",        limit: 1,    null: false
    t.integer "crono_um_id",                    null: false
    t.string  "crono_um_descp",    limit: 32,   null: false
    t.integer "crono_tipo_id",                  null: false
    t.string  "crono_tipo_nombre", limit: 16,   null: false
    t.string  "acumula",           limit: 1,    null: false
    t.integer "avance_id",                      null: false
    t.string  "avance_fecha",      limit: 16,   null: false
    t.decimal "avance_cant",                    null: false
    t.string  "avance_just",       limit: 8192, null: false
    t.string  "avance_borr",       limit: 1,    null: false
    t.integer "evid_id",                        null: false
    t.string  "evid_nom",          limit: 512,  null: false
    t.string  "evid_desc",         limit: 1024, null: false
    t.string  "evid_url",          limit: 256,  null: false
    t.string  "evid_doc",          limit: 256,  null: false
    t.string  "evid_borr",         limit: 1,    null: false
  end

  create_table "instituciones", id: false, force: :cascade do |t|
    t.integer "id",                                null: false
    t.string  "nombre",              limit: 128,   null: false
    t.integer "orden",                             null: false
    t.integer "nivelid",                           null: false
    t.integer "entidadid",                         null: false
    t.integer "unidadjerarquicaid",                null: false
    t.integer "unidadresponsableid",               null: false
    t.integer "version",                           null: false
    t.string  "borrado",             limit: 8,     null: false
    t.string  "abrev",               limit: 32,    null: false
    t.string  "baselegal",           limit: 4096,  null: false
    t.string  "mision",              limit: 2048,  null: false
    t.string  "politica",            limit: 4096,  null: false
    t.string  "diagnostico",         limit: 16384, null: false
    t.integer "anho",                              null: false
    t.string  "fechacreacion",       limit: 16,    null: false
    t.string  "objetivo",            limit: 4096,  null: false
    t.integer "nrofila",                           null: false
    t.string  "fechaactualizacion",  limit: 32,    null: false
    t.string  "fechainsercion",      limit: 16,    null: false
    t.string  "descripcion",         limit: 64,    null: false
    t.string  "sigla",               limit: 32,    null: false
    t.string  "vision",              limit: 4096,  null: false
    t.string  "ruc",                 limit: 16,    null: false
    t.string  "the_geom",            limit: 1,     null: false
    t.integer "cartodb_id",                        null: false
    t.string  "created_at",          limit: 32,    null: false
    t.string  "updated_at",          limit: 32,    null: false
  end

  create_table "linea_accion_programacion_avance", id: false, force: :cascade do |t|
    t.string  "periodo",                    limit: 256,  null: false
    t.string  "institucion_id",             limit: 8,    null: false
    t.string  "institucion_orden",          limit: 8,    null: false
    t.string  "institucion_nombre",         limit: 128,  null: false
    t.string  "institucion_sigla",          limit: 16,   null: false
    t.string  "estrategia_nombre",          limit: 64,   null: false
    t.string  "tema_nombre",                limit: 32,   null: false
    t.string  "catalogo_linea_accion_id",   limit: 4,    null: false
    t.string  "linea_accion_orden",         limit: 1,    null: false
    t.string  "instancia_linea_accion_id",  limit: 4,    null: false
    t.string  "linea_accion_nombre",        limit: 128,  null: false
    t.string  "linea_accion_descripcion",   limit: 128,  null: false
    t.string  "linea_accion_unidad_id",     limit: 2,    null: false
    t.string  "linea_accion_unidad_nombre", limit: 32,   null: false
    t.string  "catalogo_accion_id",         limit: 4,    null: false
    t.string  "instancia_accion_id",        limit: 4,    null: false
    t.string  "accion_nombre",              limit: 128,  null: false
    t.string  "accion_descripcion",         limit: 64,   null: false
    t.string  "accion_unidad_id",           limit: 2,    null: false
    t.string  "accion_unidad_nombre",       limit: 32,   null: false
    t.string  "accion_peso",                limit: 1,    null: false
    t.string  "accion_departamento_id",     limit: 4,    null: false
    t.string  "accion_departamento_nombre", limit: 16,   null: false
    t.string  "accion_distrito_id",         limit: 4,    null: false
    t.string  "accion_distrito_nombre",     limit: 32,   null: false
    t.string  "cronograma_id",              limit: 8,    null: false
    t.string  "cronograma_nombre",          limit: 256,  null: false
    t.string  "cronograma_descripcion",     limit: 512,  null: false
    t.string  "cronograma_unidad_id",       limit: 2,    null: false
    t.string  "cronograma_unidad_nombre",   limit: 32,   null: false
    t.string  "cronograma_peso",            limit: 1,    null: false
    t.string  "cronograma_proporcion",      limit: 1,    null: false
    t.string  "cronograma_tipo_id",         limit: 1,    null: false
    t.string  "cronograma_tipo_nombre",     limit: 16,   null: false
    t.string  "cronograma_acumulable",      limit: 1,    null: false
    t.string  "cronograma_producto_concat", limit: 1,    null: false
    t.string  "cronograma_producto_nombre", limit: 1,    null: false
    t.string  "fecha_entrega",              limit: 16,   null: false
    t.string  "mes_entrega",                limit: 8,    null: false
    t.string  "programacion_id",            limit: 8,    null: false
    t.string  "programacion_cantidad",      limit: 8,    null: false
    t.string  "programacion_usuario",       limit: 32,   null: false
    t.string  "programacion_actualizacion", limit: 32,   null: false
    t.string  "avance_id",                  limit: 8,    null: false
    t.string  "avance_departamento_id",     limit: 2,    null: false
    t.string  "avance_departamento_nombre", limit: 16,   null: false
    t.string  "avance_distrito_id",         limit: 2,    null: false
    t.string  "avance_distrito",            limit: 32,   null: false
    t.string  "avance_cantidad",            limit: 8,    null: false
    t.string  "avance_justificacion",       limit: 2048, null: false
    t.string  "avance_usuario",             limit: 32,   null: false
    t.string  "avance_actualizacion",       limit: 32,   null: false
    t.string  "avance_inversion",           limit: 16,   null: false
    t.string  "avance_destinatarios",       limit: 8,    null: false
    t.string  "evidencia_web",              limit: 256,  null: false
    t.string  "evidencia_doc",              limit: 256,  null: false
    t.string  "etiqueta",                   limit: 32,   null: false
    t.string  "the_geom",                   limit: 1,    null: false
    t.integer "cartodb_id",                              null: false
    t.string  "created_at",                 limit: 32,   null: false
    t.string  "updated_at",                 limit: 32,   null: false
  end

  create_table "metricas", force: :cascade do |t|
    t.string   "pagina"
    t.integer  "cantidad_descargas", default: 0
    t.integer  "cantidad_vistas",    default: 0
    t.string   "filtro"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
  end

  create_table "niveles", id: false, force: :cascade do |t|
    t.integer "nivel",                   null: false
    t.string  "nombrenivel", limit: 128, null: false
    t.string  "abrevnivel",  limit: 32,  null: false
    t.string  "the_geom",    limit: 1,   null: false
    t.integer "cartodb_id",              null: false
    t.string  "created_at",  limit: 32,  null: false
    t.string  "updated_at",  limit: 32,  null: false
  end

  create_table "pgn_gasto", id: false, force: :cascade do |t|
    t.integer "anio",                                        null: false
    t.integer "mes",                                         null: false
    t.integer "codigonivel",                                 null: false
    t.string  "descripcionnivel",                limit: 64,  null: false
    t.integer "codigoentidad",                               null: false
    t.string  "descripcionentidad",              limit: 64,  null: false
    t.integer "codigounidadresponsable",                     null: false
    t.string  "descripcionunidadresponsable",    limit: 64,  null: false
    t.integer "codigotipopresupuesto",                       null: false
    t.string  "descripciontipopresupuesto",      limit: 64,  null: false
    t.integer "codigoprograma",                              null: false
    t.string  "descripcionprograma",             limit: 128, null: false
    t.integer "codigosubprograma",                           null: false
    t.string  "descripcionsubprograma",          limit: 128, null: false
    t.integer "codigoproyecto",                              null: false
    t.string  "descripcionproyecto",             limit: 64,  null: false
    t.string  "funcion",                         limit: 64,  null: false
    t.string  "subfuncion",                      limit: 128, null: false
    t.string  "grupoeconomico",                  limit: 32,  null: false
    t.string  "subgrupoeconomico",               limit: 64,  null: false
    t.string  "categoriaeconomica",              limit: 64,  null: false
    t.string  "grupoobjetogasto",                limit: 32,  null: false
    t.string  "subgrupoobjetogasto",             limit: 128, null: false
    t.string  "objetogasto",                     limit: 128, null: false
    t.integer "codigofuentefinanciamiento",                  null: false
    t.string  "descripcionfuentefinanciamiento", limit: 32,  null: false
    t.integer "codigoorganismofinanciador",                  null: false
    t.integer "codigodepartamento",                          null: false
    t.string  "departamento",                    limit: 32,  null: false
    t.integer "codigouaf",                                   null: false
    t.string  "descripcionuaf",                  limit: 128, null: false
    t.integer "codigonivelfinanciero",                       null: false
    t.string  "nombrenivelfinanciero",           limit: 64,  null: false
    t.bigint  "presupuestoinicialaprobado",                  null: false
    t.bigint  "montovigente",                                null: false
    t.bigint  "montoplanfinancierovigente",                  null: false
    t.bigint  "montoejecutado",                              null: false
    t.bigint  "montotransferido",                            null: false
    t.bigint  "montopagado",                                 null: false
    t.integer "mescorte",                                    null: false
    t.integer "aniocorte",                                   null: false
    t.string  "fechacorte",                      limit: 16,  null: false
    t.string  "descripcionorganismofinanciador", limit: 128, null: false
    t.integer "pre_prod_concat"
  end

  create_table "pgn_gasto_old", id: false, force: :cascade do |t|
    t.integer "anio",                                        null: false
    t.integer "mes",                                         null: false
    t.integer "codigonivel",                                 null: false
    t.string  "descripcionnivel",                limit: 64,  null: false
    t.integer "codigoentidad",                               null: false
    t.string  "descripcionentidad",              limit: 64,  null: false
    t.integer "codigounidadresponsable",                     null: false
    t.string  "descripcionunidadresponsable",    limit: 64,  null: false
    t.integer "codigotipopresupuesto",                       null: false
    t.string  "descripciontipopresupuesto",      limit: 64,  null: false
    t.integer "codigoprograma",                              null: false
    t.string  "descripcionprograma",             limit: 128, null: false
    t.integer "codigosubprograma",                           null: false
    t.string  "descripcionsubprograma",          limit: 128, null: false
    t.integer "codigoproyecto",                              null: false
    t.string  "descripcionproyecto",             limit: 64,  null: false
    t.string  "funcion",                         limit: 64,  null: false
    t.string  "subfuncion",                      limit: 128, null: false
    t.string  "grupoeconomico",                  limit: 32,  null: false
    t.string  "subgrupoeconomico",               limit: 64,  null: false
    t.string  "categoriaeconomica",              limit: 64,  null: false
    t.string  "grupoobjetogasto",                limit: 32,  null: false
    t.string  "subgrupoobjetogasto",             limit: 128, null: false
    t.string  "objetogasto",                     limit: 128, null: false
    t.integer "codigofuentefinanciamiento",                  null: false
    t.string  "descripcionfuentefinanciamiento", limit: 32,  null: false
    t.integer "codigoorganismofinanciador",                  null: false
    t.integer "codigodepartamento",                          null: false
    t.string  "departamento",                    limit: 32,  null: false
    t.integer "codigouaf",                                   null: false
    t.string  "descripcionuaf",                  limit: 128, null: false
    t.integer "codigonivelfinanciero",                       null: false
    t.string  "nombrenivelfinanciero",           limit: 64,  null: false
    t.bigint  "presupuestoinicialaprobado",                  null: false
    t.bigint  "montovigente",                                null: false
    t.bigint  "montoplanfinancierovigente",                  null: false
    t.bigint  "montoejecutado",                              null: false
    t.decimal "montotransferido",                            null: false
    t.bigint  "montopagado",                                 null: false
    t.integer "mescorte",                                    null: false
    t.integer "aniocorte",                                   null: false
    t.string  "fechacorte",                      limit: 16,  null: false
    t.string  "descripcionorganismofinanciador", limit: 128, null: false
    t.integer "pre_prod_concat"
    t.index ["codigoproyecto"], name: "pgn_gasto_codigoproyecto", using: :btree
  end

  create_table "plan_accion", id: false, force: :cascade do |t|
    t.string  "institucion",           limit: 16,   null: false
    t.integer "la_id",                              null: false
    t.string  "linea_accion",          limit: 128,  null: false
    t.string  "la_unidad",             limit: 32,   null: false
    t.integer "anho",                               null: false
    t.integer "la_meta",                            null: false
    t.integer "a_id",                               null: false
    t.string  "accion",                limit: 128,  null: false
    t.decimal "a_peso",                             null: false
    t.string  "a_unidad",              limit: 32,   null: false
    t.integer "depto_id",                           null: false
    t.string  "departamento",          limit: 16,   null: false
    t.integer "dist_id",                            null: false
    t.string  "distrito",              limit: 32,   null: false
    t.integer "crono_id",                           null: false
    t.string  "cronograma",            limit: 256,  null: false
    t.string  "crono_descripcion",     limit: 1024, null: false
    t.decimal "contribucion",                       null: false
    t.decimal "influencia",                         null: false
    t.string  "crono_unidad",          limit: 32,   null: false
    t.string  "crono_tipo",            limit: 16,   null: false
    t.integer "crono_tipo_id",                      null: false
    t.string  "crono_acumula",         limit: 1,    null: false
    t.string  "fecha",                 limit: 16,   null: false
    t.string  "mes",                   limit: 8,    null: false
    t.string  "programacion_cantidad", limit: 16,   null: false
    t.decimal "avance_cantidad",                    null: false
    t.string  "justificacion",         limit: 8192, null: false
    t.string  "avance_costo",          limit: 16,   null: false
    t.string  "avance_destinatarios",  limit: 8,    null: false
    t.string  "avance_evidencias",     limit: 2,    null: false
    t.string  "distrito_avance",       limit: 32,   null: false
    t.string  "departamento_avance",   limit: 16,   null: false
  end

  create_table "pnd_meta_fisica", id: false, force: :cascade do |t|
    t.integer "plan_id",                                  null: false
    t.string  "plan_nombre",                 limit: 4,    null: false
    t.integer "eje_estrategico_id",                       null: false
    t.string  "eje_estrategico_nombre",      limit: 64,   null: false
    t.integer "linea_transversal_id",                     null: false
    t.string  "linea_transversal_nombre",    limit: 64,   null: false
    t.integer "estrategia_id",                            null: false
    t.string  "estrategia_nombre",           limit: 64,   null: false
    t.integer "objetivo_estrategico_id",                  null: false
    t.string  "objetivo_estrategico_nombre", limit: 512,  null: false
    t.integer "resultado_esperado_id",                    null: false
    t.string  "resultado_esperado_nombre",   limit: 1024, null: false
    t.integer "nivel_id",                                 null: false
    t.integer "entidad_id",                               null: false
    t.string  "entidad_sigla",               limit: 16,   null: false
    t.string  "ur_id",                       limit: 4,    null: false
    t.string  "ur_nombre",                   limit: 64,   null: false
    t.string  "prod_concat",                 limit: 32,   null: false
    t.integer "prod_id",                                  null: false
    t.string  "producto_nombre",             limit: 128,  null: false
    t.string  "producto_clase",              limit: 1,    null: false
    t.integer "anho",                                     null: false
    t.decimal "cantidad",                                 null: false
    t.string  "unidad_medida",               limit: 32,   null: false
    t.string  "the_geom",                    limit: 1,    null: false
    t.integer "cartodb_id",                               null: false
    t.string  "created_at",                  limit: 32,   null: false
    t.string  "updated_at",                  limit: 32,   null: false
    t.string  "the_geom_webmercator",        limit: 1,    null: false
    t.integer "pre_prod_concat"
  end

  create_table "programacion", id: false, force: :cascade do |t|
    t.integer "ins_id",                          null: false
    t.string  "institucion",        limit: 16,   null: false
    t.integer "ins_orden",                       null: false
    t.integer "ins_ver",                         null: false
    t.string  "ins_borr",           limit: 1,    null: false
    t.integer "la_id",                           null: false
    t.integer "la_orden",                        null: false
    t.string  "la_nombre",          limit: 128,  null: false
    t.integer "la_tipo_id",                      null: false
    t.integer "la_estrategia_id",                null: false
    t.integer "la_um_id",                        null: false
    t.string  "la_um_descp",        limit: 32,   null: false
    t.string  "la_ver",             limit: 1,    null: false
    t.string  "la_borr",            limit: 1,    null: false
    t.integer "ila_id",                          null: false
    t.integer "periodo",                         null: false
    t.integer "ila_meta",                        null: false
    t.integer "ila_ver",                         null: false
    t.string  "ila_borr",           limit: 1,    null: false
    t.integer "accion_id",                       null: false
    t.decimal "accion_peso",                     null: false
    t.string  "accion_fecha_ini",   limit: 16,   null: false
    t.string  "accion_fecha_fin",   limit: 16,   null: false
    t.integer "accion_ver",                      null: false
    t.string  "accion_bor",         limit: 1,    null: false
    t.decimal "m1",                              null: false
    t.decimal "m2",                              null: false
    t.decimal "m3",                              null: false
    t.decimal "m4",                              null: false
    t.integer "depto_id",                        null: false
    t.string  "depto_nombre",       limit: 16,   null: false
    t.integer "dist_id",                         null: false
    t.string  "dist_nombre",        limit: 32,   null: false
    t.integer "id_accion_catalogo",              null: false
    t.string  "ac_nombre",          limit: 128,  null: false
    t.integer "ac_um_id",                        null: false
    t.string  "ac_um_descp",        limit: 32,   null: false
    t.integer "ac_ver",                          null: false
    t.string  "ac_borr",            limit: 1,    null: false
    t.integer "crono_id",                        null: false
    t.string  "crono_nombre",       limit: 256,  null: false
    t.string  "crono_descp",        limit: 1024, null: false
    t.decimal "crono_prop",                      null: false
    t.decimal "crono_peso",                      null: false
    t.integer "crono_ver",                       null: false
    t.string  "crono_borr",         limit: 1,    null: false
    t.integer "crono_um_id",                     null: false
    t.integer "crono_tipo_id",                   null: false
    t.string  "crono_tipo_nombre",  limit: 16,   null: false
    t.decimal "cant_prog",                       null: false
    t.string  "fecha_entrega",      limit: 16,   null: false
    t.integer "prog_ver",                        null: false
    t.string  "prog_borr",          limit: 1,    null: false
    t.string  "crono_um_descp",     limit: 32,   null: false
    t.string  "acumula",            limit: 1,    null: false
    t.integer "prog_id",                         null: false
  end

end
