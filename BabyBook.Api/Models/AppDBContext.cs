using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

namespace BabyBook.Api.Models
{
    public class AppDBContext: IdentityDbContext<UserModel>
    {
        public AppDBContext()
            : base("BBContext")
        {
            Database.SetInitializer<AppDBContext>(new AppDbInitializer());
        }

        public virtual DbSet<Centro> Centros { get; set; }
        public virtual DbSet<Alumno> Alumnos { get; set; }
        public virtual DbSet<Profesor> Profesores { get; set; }
        public virtual DbSet<Clase> Clases { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<IdentityUserLogin>().HasKey<string>(l => l.UserId);
            //modelBuilder.Entity<IdentityRole>().HasKey<string>(r => r.Id);
            //modelBuilder.Entity<IdentityUserRole>().HasKey(r => new { r.RoleId, r.UserId });

            //modelBuilder.Entity<IdentityUser>().ToTable("Users");
            //modelBuilder.Entity<UserModel>().ToTable("Users");

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