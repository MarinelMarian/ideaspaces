require 'bundler/setup'
require 'sinatra'
require 'sinatra/base'
require 'sinatra/config_file'
require_relative 'model/idea'

module ITake
    class Service < Sinatra::Application
      register Sinatra::ConfigFile

      set :root, File.dirname(__FILE__)
      set :app_file, __FILE__
      set :environments, %w{development test production}
      set :environment, ENV['RACK_ENV'] || :development

      config_file File.join( [root, 'config', 'config.yml'] )
      ENV['DATABASE_URL'] = settings.database_url

      puts 'Setting up database for ' + ENV['RACK_ENV'] + ' environment'
      puts 'Database URL is :' + ENV['DATABASE_URL']

      DataMapper.setup(:default, ENV['DATABASE_URL'])
      DataMapper.repository(:default).adapter.resource_naming_convention =
      DataMapper::NamingConventions::Resource::
      UnderscoredAndPluralizedWithoutModule

      DataMapper::Model.raise_on_save_failure = true

      DataMapper.finalize
      DataMapper.auto_upgrade!


      get '/ideas' do
        content_type :json
        idea = Idea.new
        idea.title = "My idea"
        idea.description = "My glorious idea"
        idea.save

        idea.to_json
      end
    end
end
