using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Workplanner.Migrations
{
    /// <inheritdoc />
    public partial class changeModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Shifts_Days_DayId",
                table: "Shifts");

            migrationBuilder.DropTable(
                name: "DayShifts");

            migrationBuilder.DropTable(
                name: "Days");

            migrationBuilder.DropIndex(
                name: "IX_Shifts_DayId",
                table: "Shifts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_User",
                table: "User");

            migrationBuilder.DropColumn(
                name: "DayId",
                table: "Shifts");

            migrationBuilder.RenameTable(
                name: "User",
                newName: "Users");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "PlanningShifts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PlanningPeriodId = table.Column<Guid>(type: "uuid", nullable: false),
                    ShiftId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlanningShifts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlanningShifts_PlanningPeriods_PlanningPeriodId",
                        column: x => x.PlanningPeriodId,
                        principalTable: "PlanningPeriods",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlanningShifts_Shifts_ShiftId",
                        column: x => x.ShiftId,
                        principalTable: "Shifts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlanningShifts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PlanningShifts_PlanningPeriodId",
                table: "PlanningShifts",
                column: "PlanningPeriodId");

            migrationBuilder.CreateIndex(
                name: "IX_PlanningShifts_ShiftId",
                table: "PlanningShifts",
                column: "ShiftId");

            migrationBuilder.CreateIndex(
                name: "IX_PlanningShifts_UserId",
                table: "PlanningShifts",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PlanningShifts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Users");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "User");

            migrationBuilder.AddColumn<Guid>(
                name: "DayId",
                table: "Shifts",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_User",
                table: "User",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Days",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PlanningPeriodId = table.Column<Guid>(type: "uuid", nullable: false),
                    Date = table.Column<DateOnly>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Days", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Days_PlanningPeriods_PlanningPeriodId",
                        column: x => x.PlanningPeriodId,
                        principalTable: "PlanningPeriods",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DayShifts",
                columns: table => new
                {
                    DayId = table.Column<Guid>(type: "uuid", nullable: false),
                    ShiftId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DayShifts", x => new { x.DayId, x.ShiftId });
                    table.ForeignKey(
                        name: "FK_DayShifts_Days_DayId",
                        column: x => x.DayId,
                        principalTable: "Days",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DayShifts_Shifts_ShiftId",
                        column: x => x.ShiftId,
                        principalTable: "Shifts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Shifts_DayId",
                table: "Shifts",
                column: "DayId");

            migrationBuilder.CreateIndex(
                name: "IX_Days_PlanningPeriodId",
                table: "Days",
                column: "PlanningPeriodId");

            migrationBuilder.CreateIndex(
                name: "IX_DayShifts_ShiftId",
                table: "DayShifts",
                column: "ShiftId");

            migrationBuilder.AddForeignKey(
                name: "FK_Shifts_Days_DayId",
                table: "Shifts",
                column: "DayId",
                principalTable: "Days",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
