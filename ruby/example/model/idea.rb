require 'dm-core'
require 'dm-types'

module ITake
  class Idea
    include DataMapper::Resource
    property :id, Serial, :key => true

    # belongs_to :member, ITake::Member, :required => true
    # belongs_to :idea_space, ITake::IdeaSpace, :required => true
    property :title, String, :length => 45, :required => true
    property :description, String, :length => 45, :required => true

  end
end
