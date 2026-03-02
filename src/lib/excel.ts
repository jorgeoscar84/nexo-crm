import ExcelJS from "exceljs";

export async function generateExcelReport(
    data: Record<string, any>[],
    columns: { header: string; key: string; width?: number }[],
    filename: string,
    sheetName: string = "Reporte"
) {
    // Crear un nuevo libro de trabajo y una hoja de cálculo
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    // Configurar las columnas
    worksheet.columns = columns.map((col) => ({
        header: col.header,
        key: col.key,
        width: col.width || 20,
    }));

    // Aplicar estilos a la fila de encabezados
    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
        cell.font = { bold: true, color: { argb: "FFFFFFFF" } }; // Texto blanco
        cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FF3B82F6" }, // Azul (Nexo primary aprox)
        };
        cell.alignment = { vertical: "middle", horizontal: "center" };
        cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
        };
    });

    // Congelar la fila de encabezados
    worksheet.views = [{ state: "frozen", xSplit: 0, ySplit: 1 }];

    // Agregar los datos
    data.forEach((item) => {
        worksheet.addRow(item);
    });

    // Generar el buffer
    const buffer = await workbook.xlsx.writeBuffer();

    return buffer;
}

export function downloadExcelClient(buffer: ArrayBuffer, filename: string) {
    // Crear un blob a partir del buffer y forzar la descarga en el cliente
    const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
}
