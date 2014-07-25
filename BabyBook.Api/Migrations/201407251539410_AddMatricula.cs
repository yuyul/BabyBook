namespace BabyBook.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddMatricula : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Alumnoes", "CentroId", "dbo.Centroes");
            DropForeignKey("dbo.Clases", "CentroId", "dbo.Centroes");
            DropForeignKey("dbo.Profesors", "CentroId", "dbo.Centroes");
            CreateTable(
                "dbo.Matriculas",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        AlumnoId = c.Int(nullable: false),
                        CursoId = c.Int(nullable: false),
                        ClaseId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Cursoes", t => t.CursoId)
                .ForeignKey("dbo.Clases", t => t.ClaseId)
                .ForeignKey("dbo.Alumnoes", t => t.AlumnoId)
                .Index(t => t.AlumnoId)
                .Index(t => t.CursoId)
                .Index(t => t.ClaseId);
            
            AddForeignKey("dbo.Alumnoes", "CentroId", "dbo.Centroes", "Id");
            AddForeignKey("dbo.Clases", "CentroId", "dbo.Centroes", "Id");
            AddForeignKey("dbo.Profesors", "CentroId", "dbo.Centroes", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Profesors", "CentroId", "dbo.Centroes");
            DropForeignKey("dbo.Clases", "CentroId", "dbo.Centroes");
            DropForeignKey("dbo.Alumnoes", "CentroId", "dbo.Centroes");
            DropForeignKey("dbo.Matriculas", "AlumnoId", "dbo.Alumnoes");
            DropForeignKey("dbo.Matriculas", "ClaseId", "dbo.Clases");
            DropForeignKey("dbo.Matriculas", "CursoId", "dbo.Cursoes");
            DropIndex("dbo.Matriculas", new[] { "ClaseId" });
            DropIndex("dbo.Matriculas", new[] { "CursoId" });
            DropIndex("dbo.Matriculas", new[] { "AlumnoId" });
            DropTable("dbo.Matriculas");
            AddForeignKey("dbo.Profesors", "CentroId", "dbo.Centroes", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Clases", "CentroId", "dbo.Centroes", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Alumnoes", "CentroId", "dbo.Centroes", "Id", cascadeDelete: true);
        }
    }
}
