using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace BabyBook.Api.Models
{
    public class BbContext: DbContext
    {

        public BbContext()
            : base("name=BbContext")
        {
            
           //Database.SetInitializer<BbContext>(new BbDbInitializer());
        }

        public virtual DbSet<Centro> Centros { get; set; }
        public virtual DbSet<Alumno> Alumnos { get; set; }
        public virtual DbSet<Profesor> Profesores { get; set; }
        public virtual DbSet<Clase> Clases { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Centro>()
                .HasMany(e => e.Alumnos)
                .WithRequired(e => e.Centro)
                .HasForeignKey(e => e.CentroId)
                .WillCascadeOnDelete(true);

            modelBuilder.Entity<Centro>()
                .HasMany(e => e.Profesores)
                .WithRequired(e => e.Centro)
                .HasForeignKey(e => e.CentroId)
                .WillCascadeOnDelete(true);

            modelBuilder.Entity<Centro>()
                .HasMany(e => e.Clases)
                .WithRequired(e => e.Centro)
                .HasForeignKey(e => e.CentroId)
                .WillCascadeOnDelete(true);
        }
    }
}