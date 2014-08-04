namespace BabyBook.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ProfesorClase : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Profesors", "ClaseId", c => c.Int(nullable: true));
            CreateIndex("dbo.Profesors", "ClaseId");
            AddForeignKey("dbo.Profesors", "ClaseId", "dbo.Clases", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Profesors", "ClaseId", "dbo.Clases");
            DropIndex("dbo.Profesors", new[] { "ClaseId" });
            DropColumn("dbo.Profesors", "ClaseId");
        }
    }
}
