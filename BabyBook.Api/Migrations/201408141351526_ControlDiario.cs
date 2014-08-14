namespace BabyBook.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ControlDiario : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ControlDiarios",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Fecha = c.DateTime(nullable: false),
                        AlumnoId = c.Int(nullable: false),
                        ObservacionesCasa = c.String(),
                        ObservacionesCentro = c.String(),
                        EstadoDia = c.Int(),
                        Comida = c.Int(),
                        Siesta = c.Int(),
                        Merienda = c.Int(),
                        Deposicion = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Alumnoes", t => t.AlumnoId, cascadeDelete: true)
                .Index(t => t.AlumnoId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ControlDiarios", "AlumnoId", "dbo.Alumnoes");
            DropIndex("dbo.ControlDiarios", new[] { "AlumnoId" });
            DropTable("dbo.ControlDiarios");
        }
    }
}
