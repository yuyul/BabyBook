namespace BabyBook.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class emailmapeado : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Profesores", "Email", c => c.String());
            AddColumn("dbo.Familiares", "Email", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Familiares", "Email");
            DropColumn("dbo.Profesores", "Email");
        }
    }
}
