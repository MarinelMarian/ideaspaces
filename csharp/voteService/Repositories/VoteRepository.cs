using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;  
using Microsoft.Extensions.Logging;
 
 using ideaspaces.Model;

 
namespace ideaspaces.Repositories
{
    public interface IVoteRepository {
        List<Vote> GetAll();
        List<Vote> GetAllByIdeaId(string ideaId);
        Vote Get(long voteId);
        Vote CastVote(int userId, string ideaId, bool voted);


    }
    
    public class VoteRepository : IVoteRepository
    {
        private readonly VoteContext _context;
 
        private readonly ILogger _logger;
 
        public VoteRepository(VoteContext context, ILoggerFactory loggerFactory)
        {
            _context = context;
            _logger = loggerFactory.CreateLogger("IVoteResporitory");          
        }
        
        public List<Vote> GetAllByIdeaId(string ideaId)
        {
            _logger.LogCritical("Getting the existing records");
            return _context.Votes != null ? _context.Votes.Where( i => i.IdeaId == ideaId ).ToList() : Enumerable.Empty<Vote>().ToList();
        }
 
		public Vote CastVote(int userId, string ideaId, bool voteStatus)
		{ 
			Vote vote = _context.Votes.Where (v => v.UserId == userId && v.IdeaId == ideaId).FirstOrDefault<Vote> ();

            if(vote == null){
			    vote = new Vote(userId, ideaId, voteStatus);
            }
			
            Post(vote);
			
            _logger.LogCritical("Getting the existing records");
			return vote;
		}

        public List<Vote> GetAll()
        {
            Vote vote = new Vote(1,"id-idee-mongo",true);
            Post(vote);
            
            _logger.LogCritical("Getting the existing records");
            return _context.Votes != null ? _context.Votes.ToList() : Enumerable.Empty<Vote>().ToList();
        }
 
        public Vote Get(long id)
        {
            return _context.Votes.First(t => t.Id == id);
        }
 
        [HttpPost]
        public void Post(Vote Vote )
        {
            _context.Votes.Add(Vote);
            _context.SaveChanges();
        }
 
        public void Put(long id, [FromBody]Vote Vote)
        {
            _context.Votes.Update(Vote);
            _context.SaveChanges();
        }
 
        public void Delete(long id)
        {
            var entity = _context.Votes.First(t => t.Id == id);
            _context.Votes.Remove(entity);
            _context.SaveChanges();
        }
    }
}
