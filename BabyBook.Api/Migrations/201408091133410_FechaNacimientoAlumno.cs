namespace BabyBook.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FechaNacimientoAlumno : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Alumnoes", "FechaNacimiento", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Alumnoes", "FechaNacimiento");
        }
    }
}
