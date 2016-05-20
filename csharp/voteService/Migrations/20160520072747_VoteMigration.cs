using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace voteService.Migrations
{
    public partial class VoteMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Votes",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Autoincrement", true),
                    UserId = table.Column<long>(nullable: false),
                    IdeaId = table.Column<string>(nullable: false),
                    Voted = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vote", x => x.Id);
                });

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "Votes");

        }
    }
}
