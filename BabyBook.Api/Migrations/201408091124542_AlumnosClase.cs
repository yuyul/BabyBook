namespace BabyBook.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AlumnosClase : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.Matriculas", newName: "AlumnoClases");
            AddColumn("dbo.Cursoes", "Activo", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Cursoes", "Activo");
            RenameTable(name: "dbo.AlumnoClases", newName: "Matriculas");
        }
    }
}
