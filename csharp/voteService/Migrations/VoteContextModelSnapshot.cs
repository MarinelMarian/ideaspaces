using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using ideaspaces.Model;

namespace ideaspaces.Migrations
{
    [DbContext(typeof(VoteContext))]
    partial class VoteContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rc2-20896");

            modelBuilder.Entity("ideaspaces.Model.Vote", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();
                    b.Property<int>("UserId");

                    b.Property<string>("IdeaId");

                    b.Property<bool>("Voted");

                    b.HasKey("Id");

                    b.ToTable("Votes");
                });
        }
    }
}
