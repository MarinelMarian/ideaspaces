using System;
using System.Collections.Generic;

namespace ideaspaces.Model
{
    public class Vote {
        public int Id {get; set; }
        public int UserId {get; set; }
        public string IdeaId {get; set; }
        public bool Voted {get; set; }
        
        public Vote(){
        
        }
        
        public Vote(int userId, string ideaId, bool voted){
            UserId = userId;
            IdeaId = ideaId;
            Voted = voted;
        }
    }

}