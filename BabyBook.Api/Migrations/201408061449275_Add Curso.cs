namespace BabyBook.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddCurso : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Cursoes", "CentroId", c => c.Int(nullable: false));
            CreateIndex("dbo.Cursoes", "CentroId");
            AddForeignKey("dbo.Cursoes", "CentroId", "dbo.Centroes", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Cursoes", "CentroId", "dbo.Centroes");
            DropIndex("dbo.Cursoes", new[] { "CentroId" });
            DropColumn("dbo.Cursoes", "CentroId");
        }
    }
}
