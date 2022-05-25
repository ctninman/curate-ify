# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_05_24_183748) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "albums", force: :cascade do |t|
    t.string "album_title"
    t.string "artist_name"
    t.string "spotify_artist_id"
    t.integer "rating"
    t.string "spotify_album_id"
    t.text "description"
    t.text "spotify_uri"
    t.text "album_cover"
    t.integer "user_id"
    t.integer "artist_id"
    t.string "release_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "genres", default: [], array: true
    t.string "tags", default: [], array: true
  end

  create_table "artists", force: :cascade do |t|
    t.string "spotify_artist_id"
    t.boolean "top_artist"
    t.string "artist_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "artist_photo"
  end

  create_table "list_albums", force: :cascade do |t|
    t.string "album_title"
    t.string "artist"
    t.string "album_cover"
    t.integer "list_id"
    t.integer "list_order"
    t.string "spotify_id"
    t.string "spotify_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "lists", force: :cascade do |t|
    t.string "list_name"
    t.boolean "is_public"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "queue_albums", force: :cascade do |t|
    t.string "album_title"
    t.string "artist_name"
    t.string "spotify_artist_id"
    t.string "spotify_album_id"
    t.string "spotify_uri"
    t.string "album_cover"
    t.integer "user_id"
    t.string "release_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "relationships", force: :cascade do |t|
    t.integer "follower_id"
    t.integer "followee_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "spotify_logins", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "email"
    t.boolean "collection_public"
    t.string "user_tags", default: [], array: true
    t.string "spotify_username"
    t.string "spotify_url"
    t.text "spotify_profile_image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "spotify_access_token"
    t.text "spotify_refresh_token"
    t.integer "spotify_expires_in"
    t.boolean "connected_to_spotify"
  end

end
