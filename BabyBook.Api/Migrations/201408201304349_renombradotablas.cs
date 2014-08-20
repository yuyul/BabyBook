namespace BabyBook.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class renombradotablas : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.Alumnoes", newName: "Alumnos");
            RenameTable(name: "dbo.Centroes", newName: "Centros");
            RenameTable(name: "dbo.AlumnoClases", newName: "AlumnosClases");
            RenameTable(name: "dbo.Cursoes", newName: "Cursos");
            RenameTable(name: "dbo.Profesors", newName: "Profesores");
            RenameTable(name: "dbo.AlumnoFamiliars", newName: "AlumnosFamiliares");
            RenameTable(name: "dbo.Familiars", newName: "Familiares");
            RenameTable(name: "dbo.ControlDiarios", newName: "ControlesDiarios");
        }
        
        public override void Down()
        {
            RenameTable(name: "dbo.ControlesDiarios", newName: "ControlDiarios");
            RenameTable(name: "dbo.Familiares", newName: "Familiars");
            RenameTable(name: "dbo.AlumnosFamiliares", newName: "AlumnoFamiliars");
            RenameTable(name: "dbo.Profesores", newName: "Profesors");
            RenameTable(name: "dbo.Cursos", newName: "Cursoes");
            RenameTable(name: "dbo.AlumnosClases", newName: "AlumnoClases");
            RenameTable(name: "dbo.Centros", newName: "Centroes");
            RenameTable(name: "dbo.Alumnos", newName: "Alumnoes");
        }
    }
}
