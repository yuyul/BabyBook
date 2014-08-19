namespace BabyBook.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class indicealumnofecha : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.ControlDiarios", new[] { "AlumnoId" });
            CreateIndex("dbo.ControlDiarios", new[] { "Fecha", "AlumnoId" }, unique: true, name: "AlumnoFecha");
        }
        
        public override void Down()
        {
            DropIndex("dbo.ControlDiarios", "AlumnoFecha");
            CreateIndex("dbo.ControlDiarios", "AlumnoId");
        }
    }
}
