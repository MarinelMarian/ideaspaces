using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using ideaspaces.Model;

namespace voteService.Migrations
{
    [DbContext(typeof(VoteContext))]
    [Migration("20160520072747_VoteMigration")]
    partial class VoteMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rc2-20896");

            modelBuilder.Entity("ideaspaces.Model.Vote", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();


                    b.Property<string>("IdeaId");
                    b.Property<int>("UserId");

                    b.Property<bool>("Voted");

                    b.HasKey("Id");

                    b.ToTable("Votes");
                });
        }
    }
}
