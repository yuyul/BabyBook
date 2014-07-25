using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace BabyBook.Api.Models
{
    public class BbContext : IdentityDbContext<UserApp>
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
        public virtual DbSet<Curso> Cursos { get; set; }
        public virtual DbSet<Matricula> Matriculas { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Centro>()
                .HasMany(e => e.Alumnos)
                .WithRequired(e => e.Centro)
                .HasForeignKey(e => e.CentroId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Centro>()
                .HasMany(e => e.Profesores)
                .WithRequired(e => e.Centro)
                .HasForeignKey(e => e.CentroId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Centro>()
                .HasMany(e => e.Clases)
                .WithRequired(e => e.Centro)
                .HasForeignKey(e => e.CentroId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Alumno>()
                .HasMany(e=>e.Matriculas)
                .WithRequired(e=>e.Alumno)
                .HasForeignKey(e=>e.AlumnoId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Clase>()
                .HasMany(e=>e.Matriculas)
                .WithRequired(e=>e.Clase)
                .HasForeignKey(e=>e.ClaseId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Curso>()
                .HasMany(e=>e.Matriculas)
                .WithRequired(e=>e.Curso)
                .HasForeignKey(e=>e.CursoId)
                .WillCascadeOnDelete(false);

            //modelBuilder.Entity<UserApp>().HasMany(e=>e.Centros).WithRequired(e=>e.Gestor).HasForeignKey(e=>e.GestorId).WillCascadeOnDelete(true);
                
                

            //modelBuilder.Entity<IdentityUserLogin>().HasKey<string>(l => l.UserId);
            modelBuilder.Entity<IdentityRole>().HasKey<string>(r => r.Id);
            modelBuilder.Entity<IdentityUserRole>().HasKey(r => new { r.RoleId, r.UserId });
        }
    }
}