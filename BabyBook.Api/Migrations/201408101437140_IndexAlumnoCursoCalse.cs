namespace BabyBook.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class IndexAlumnoCursoCalse : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.AlumnoClases", new[] { "AlumnoId" });
            DropIndex("dbo.AlumnoClases", new[] { "CursoId" });
            DropIndex("dbo.AlumnoClases", new[] { "ClaseId" });
            CreateIndex("dbo.AlumnoClases", new[] { "AlumnoId", "CursoId", "ClaseId" }, unique: true, name: "AlumnoCursoClase");
        }
        
        public override void Down()
        {
            DropIndex("dbo.AlumnoClases", "AlumnoCursoClase");
            CreateIndex("dbo.AlumnoClases", "ClaseId");
            CreateIndex("dbo.AlumnoClases", "CursoId");
            CreateIndex("dbo.AlumnoClases", "AlumnoId");
        }
    }
}
