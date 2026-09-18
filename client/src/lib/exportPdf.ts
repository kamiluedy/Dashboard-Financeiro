import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import type { CategoryPoint, DashboardSummary } from '../types';

/** Gera um PDF simples com o resumo financeiro, uma captura do gráfico e a tabela de categorias. */
export async function exportDashboardPdf(
  chartElement: HTMLElement | null,
  summary: DashboardSummary,
  categories: CategoryPoint[],
) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text('Relatório do Dashboard Finanças', 14, 16);

  doc.setFontSize(11);
  doc.text(`Saldo: R$ ${summary.saldo.toFixed(2)}`, 14, 28);
  doc.text(`Entradas: R$ ${summary.entradas.toFixed(2)}`, 14, 35);
  doc.text(`Saídas: R$ ${summary.saidas.toFixed(2)}`, 14, 42);

  let nextY = 50;

  if (chartElement) {
    const canvas = await html2canvas(chartElement);
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 180;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    doc.addImage(imgData, 'PNG', 14, nextY, imgWidth, imgHeight);
    nextY += imgHeight + 10;
  }

  autoTable(doc, {
    startY: nextY,
    head: [['Categoria', 'Valor (R$)']],
    body: categories.map((c) => [c.category, c.value.toFixed(2)]),
  });

  doc.save('relatorio-dashboard.pdf');
}
