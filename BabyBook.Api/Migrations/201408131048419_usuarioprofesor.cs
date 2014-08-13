namespace BabyBook.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class usuarioprofesor : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Profesors", "PrimerApellido", c => c.String());
            AddColumn("dbo.Profesors", "SegundoApellido", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Profesors", "SegundoApellido");
            DropColumn("dbo.Profesors", "PrimerApellido");
        }
    }
}
