using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Workplanner.Migrations
{
    /// <inheritdoc />
    public partial class addedDatePlanningShift : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlanningShifts_Users_UserId",
                table: "PlanningShifts");

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "PlanningShifts",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddColumn<DateOnly>(
                name: "Date",
                table: "PlanningShifts",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddForeignKey(
                name: "FK_PlanningShifts_Users_UserId",
                table: "PlanningShifts",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlanningShifts_Users_UserId",
                table: "PlanningShifts");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "PlanningShifts");

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "PlanningShifts",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PlanningShifts_Users_UserId",
                table: "PlanningShifts",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
