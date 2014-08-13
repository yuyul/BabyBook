namespace BabyBook.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addprofesoruserid : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Profesors", "UserId", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Profesors", "UserId");
        }
    }
}
