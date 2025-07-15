using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SkinApi.Migrations
{
    /// <inheritdoc />
    public partial class AddSkinLegacyProperty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Legacy",
                table: "Skins",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Legacy",
                table: "Skins");
        }
    }
}
