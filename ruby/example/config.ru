require 'dm-migrations'
require 'dm-serializer'
require 'json'
require_relative './service'

use Rack::ShowExceptions

run ITake::Service.new
