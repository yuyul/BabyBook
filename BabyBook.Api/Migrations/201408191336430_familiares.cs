namespace BabyBook.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class familiares : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AlumnoFamiliars",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        AlumnoId = c.Int(nullable: false),
                        FamiliarId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Alumnoes", t => t.AlumnoId, cascadeDelete: true)
                .ForeignKey("dbo.Familiars", t => t.FamiliarId, cascadeDelete: true)
                .Index(t => t.AlumnoId)
                .Index(t => t.FamiliarId);
            
            CreateTable(
                "dbo.Familiars",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Nombre = c.String(),
                        PrimerApellido = c.String(),
                        SegundoApellido = c.String(),
                        DNI = c.String(),
                        UserId = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AlumnoFamiliars", "FamiliarId", "dbo.Familiars");
            DropForeignKey("dbo.AlumnoFamiliars", "AlumnoId", "dbo.Alumnoes");
            DropIndex("dbo.AlumnoFamiliars", new[] { "FamiliarId" });
            DropIndex("dbo.AlumnoFamiliars", new[] { "AlumnoId" });
            DropTable("dbo.Familiars");
            DropTable("dbo.AlumnoFamiliars");
        }
    }
}
