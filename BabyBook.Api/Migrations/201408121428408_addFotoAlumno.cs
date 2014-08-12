namespace BabyBook.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addFotoAlumno : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Alumnoes", "Foto", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Alumnoes", "Foto");
        }
    }
}
