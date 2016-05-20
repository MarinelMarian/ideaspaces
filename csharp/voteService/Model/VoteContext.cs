using Microsoft.EntityFrameworkCore;
 
namespace ideaspaces.Model
{
    public class VoteContext : DbContext
    {
        public VoteContext(DbContextOptions<VoteContext> options) :base(options){ }
         
        public DbSet<Vote> Votes { get; set; }
       
        protected override void OnModelCreating(ModelBuilder builder)
        { 
            builder.Entity<Vote>().HasKey(m => m.Id); 
            base.OnModelCreating(builder); 
        } 
    }
}