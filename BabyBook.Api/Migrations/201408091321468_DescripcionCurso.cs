namespace BabyBook.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DescripcionCurso : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Cursoes", "Descripcion", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Cursoes", "Descripcion");
        }
    }
}
