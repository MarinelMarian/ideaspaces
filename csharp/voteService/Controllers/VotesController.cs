using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ideaspaces.Model;
using ideaspaces.Repositories;


namespace ideaspaces.Controllers
{
    [Route("vote/[controller]")]
    public class VotesController : Controller
    {
    
        private readonly IVoteRepository VoteRepository;

        public VotesController(IVoteRepository voteRepository)
        {
            VoteRepository = voteRepository;
        }
        
        [HttpGet("idea/{ideaId}")]
        public IEnumerable<Vote> GetVotes(string ideaId){
            return VoteRepository.GetAllByIdeaId(ideaId);
        }
    
        [HttpGet("stub")]
        public IEnumerable<Vote> Get()
        {
            
            return VoteRepository.GetAll();
        }
        
        [HttpGet("{id}")]
        public string Get(int ideaId)
        {
            
            return "value";
        }

        [HttpPost("save")]
        public void Post(int userId, String ideaId, bool voted)
        {
            VoteRepository.CastVote(userId, ideaId, voted);
            
        }

    }
}
