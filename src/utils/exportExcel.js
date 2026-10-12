/**
 * Clean & Professional Excel Exporter (.xls SpreadsheetML)
 * - Removed all pink and decorative colors (clean white & neutral styling)
 * - Fixed column alignment: consistent alignment per column (no random left/center jumps)
 * - Retains generous column widths and row heights so data is never cut off
 * - Pure table records starting directly from Row 1
 */

const escapeXml = (unsafe) => {
  if (unsafe === null || unsafe === undefined) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

const createExcelXml = ({ sheetName, columns, rows }) => {
  const columnDefs = columns
    .map((col) => `<Column ss:Width="${col.width || 150}"/>`)
    .join('\n   ');

  const headerCells = columns
    .map((col) => {
      const headerStyle = col.align === 'center' ? 'HeaderCenter' : 'HeaderLeft';
      return `<Cell ss:StyleID="${headerStyle}"><Data ss:Type="String">${escapeXml(
        col.header
      )}</Data></Cell>`;
    })
    .join('');

  const rowLines = rows
    .map((row) => {
      const cellData = row
        .map((cell, colIndex) => {
          const col = columns[colIndex] || {};
          const isNum = typeof cell === 'number';
          const type = isNum ? 'Number' : 'String';
          const styleId = col.align === 'center' ? 'CellCenter' : 'CellLeft';
          return `<Cell ss:StyleID="${styleId}"><Data ss:Type="${type}">${escapeXml(
            cell
          )}</Data></Cell>`;
        })
        .join('');
      return `   <Row ss:Height="26">${cellData}</Row>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
  <Author>VOX Karaoke Admin</Author>
 </DocumentProperties>
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal">
   <Alignment ss:Vertical="Center"/>
   <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#0F172A"/>
  </Style>

  <!-- Neutral Header Styles (No Pink Colors, Clean Dark Text & Neutral Border) -->
  <Style ss:ID="HeaderLeft">
   <Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#0F172A"/>
   <Interior ss:Color="#F1F5F9" ss:Pattern="Solid"/>
   <Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
   </Borders>
  </Style>

  <Style ss:ID="HeaderCenter">
   <Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#0F172A"/>
   <Interior ss:Color="#F1F5F9" ss:Pattern="Solid"/>
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
   </Borders>
  </Style>

  <!-- Pure White Data Cell Styles (Consistent Left and Center Alignments) -->
  <Style ss:ID="CellLeft">
   <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#1E293B"/>
   <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
   <Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
   </Borders>
  </Style>

  <Style ss:ID="CellCenter">
   <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#1E293B"/>
   <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
   </Borders>
  </Style>
 </Styles>
 <Worksheet ss:Name="${escapeXml(sheetName)}">
  <Table ss:DefaultRowHeight="26">
   ${columnDefs}
   <Row ss:Height="30">
    ${headerCells}
   </Row>
${rowLines}
  </Table>
  <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
   <Selected/>
   <Panes>
    <Pane>
     <Number>3</Number>
     <ActiveRow>1</ActiveRow>
    </Pane>
   </Panes>
   <ProtectObjects>False</ProtectObjects>
   <ProtectScenarios>False</ProtectScenarios>
  </WorksheetOptions>
 </Worksheet>
</Workbook>`;
};

const triggerDownload = (content, filename, mimeType = 'application/vnd.ms-excel') => {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// 1. Export ONLY Users Data
export const downloadUsersExcel = (users) => {
  const columns = [
    { header: 'User ID', width: 130, align: 'center' },
    { header: 'User Name', width: 200, align: 'left' },
    { header: 'Email', width: 240, align: 'left' },
    { header: 'Songs Sung', width: 120, align: 'center' },
    { header: 'Joined Date', width: 140, align: 'center' },
    { header: 'Tier', width: 120, align: 'center' },
    { header: 'Status', width: 120, align: 'center' },
  ];

  const rows = users.map((u) => [
    u.userId,
    u.name,
    u.email,
    Number(u.songsSung),
    u.joinedDate,
    u.tier,
    u.status,
  ]);

  const xml = createExcelXml({
    sheetName: 'Users',
    columns,
    rows,
  });

  triggerDownload(xml, `vox_karaoke_users_${Date.now()}.xls`);
};

// 2. Export ONLY Songs Data
export const downloadSongsExcel = (songs) => {
  const columns = [
    { header: 'Song ID', width: 130, align: 'center' },
    { header: 'Song Name', width: 220, align: 'left' },
    { header: 'Artist Name', width: 260, align: 'left' },
    { header: 'Provider', width: 150, align: 'center' },
    { header: 'Duration', width: 110, align: 'center' },
    { header: 'Language', width: 120, align: 'center' },
    { header: 'Karaoke Status', width: 140, align: 'center' },
  ];

  const rows = songs.map((s) => [
    s.trackCode,
    s.title,
    s.artist,
    s.provider,
    s.duration,
    s.language,
    s.status,
  ]);

  const xml = createExcelXml({
    sheetName: 'Songs Catalogue',
    columns,
    rows,
  });

  triggerDownload(xml, `vox_karaoke_songs_${Date.now()}.xls`);
};

// 3. Export ONLY Performances Data (Analytics Report)
export const downloadExcelReport = (performances) => {
  const columns = [
    { header: 'Performance ID', width: 130, align: 'center' },
    { header: 'Performance Name', width: 220, align: 'left' },
    { header: 'User Name', width: 180, align: 'left' },
    { header: 'User Email', width: 240, align: 'left' },
    { header: 'Duration', width: 110, align: 'center' },
    { header: 'Date', width: 140, align: 'center' },
    { header: 'Score', width: 100, align: 'center' },
    { header: 'Status', width: 120, align: 'center' },
  ];

  const rows = performances.map((p) => [
    p.perfCode,
    p.song,
    p.user,
    p.email,
    p.duration,
    p.date,
    Number(p.score),
    p.status,
  ]);

  const xml = createExcelXml({
    sheetName: 'Performances',
    columns,
    rows,
  });

  triggerDownload(xml, `vox_karaoke_performances_${Date.now()}.xls`);
};

// 4. Export Performances Page Data
export const downloadPerformancesExcel = (performances) => {
  const columns = [
    { header: 'Performance ID', width: 130, align: 'center' },
    { header: 'Performance Name', width: 220, align: 'left' },
    { header: 'User Name', width: 180, align: 'left' },
    { header: 'User Email', width: 240, align: 'left' },
    { header: 'Duration', width: 110, align: 'center' },
    { header: 'Date', width: 140, align: 'center' },
    { header: 'Score', width: 100, align: 'center' },
    { header: 'Status', width: 120, align: 'center' },
  ];

  const rows = performances.map((p) => [
    p.perfCode,
    p.song,
    p.user,
    p.email,
    p.duration,
    p.date,
    Number(p.score),
    p.status,
  ]);

  const xml = createExcelXml({
    sheetName: 'Performances',
    columns,
    rows,
  });

  triggerDownload(xml, `vox_karaoke_performances_${Date.now()}.xls`);
};

// 5. Export Reports Page Summary Metrics
export const downloadReportSummaryExcel = (metrics) => {
  const columns = [
    { header: 'Metric', width: 240, align: 'left' },
    { header: 'Value', width: 140, align: 'center' },
  ];

  const rows = metrics.map((m) => [
    m.label,
    Number(String(m.value).replace(/,/g, '')),
  ]);

  const xml = createExcelXml({
    sheetName: 'Report Summary',
    columns,
    rows,
  });

  triggerDownload(xml, `vox_karaoke_report_summary_${Date.now()}.xls`);
};
