import React, { useState } from 'react';
import { X, Download, FileSpreadsheet, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { downloadUsersExcel, downloadExcelReport } from '../../utils/exportExcel';
import { mockUsersList } from '../../data/mockUsers';
import { mockPerformancesList } from '../../data/mockPerformances';

export const ExportModal = () => {
  const { activeModal, setActiveModal } = useApp();
  const [format, setFormat] = useState('csv');
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (activeModal !== 'export-report' && activeModal !== 'export-users') {
    return null;
  }

  const isUsers = activeModal === 'export-users';
  const title = isUsers ? 'Export Users Data' : 'Export Analytics Report';

  const handleExport = () => {
    setDownloading(true);
    setTimeout(() => {
      if (isUsers) {
        downloadUsersExcel(mockUsersList);
      } else {
        downloadExcelReport(mockPerformancesList);
      }
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => {
        setDownloaded(false);
        setActiveModal(null);
      }, 1000);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-[#ff2b75]" />
            <h3 className="font-bold text-slate-900 text-sm">{title}</h3>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-500">
            Choose your preferred file export format. All data columns and filters will be included.
          </p>

          <div className="space-y-2">
            <label
              onClick={() => setFormat('csv')}
              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                format === 'csv'
                  ? 'border-[#ff2b75] bg-pink-50/40'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-800">CSV Spreadsheet (.csv)</span>
              </div>
              <input
                type="radio"
                name="format"
                checked={format === 'csv'}
                onChange={() => setFormat('csv')}
                className="accent-[#ff2b75]"
              />
            </label>

            <label
              onClick={() => setFormat('json')}
              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                format === 'json'
                  ? 'border-[#ff2b75] bg-pink-50/40'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold text-blue-600">JSON</span>
                <span className="text-xs font-bold text-slate-800">Raw JSON (.json)</span>
              </div>
              <input
                type="radio"
                name="format"
                checked={format === 'json'}
                onChange={() => setFormat('json')}
                className="accent-[#ff2b75]"
              />
            </label>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            onClick={() => setActiveModal(null)}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={downloading || downloaded}
            className="px-4 py-2 bg-[#ff2b75] hover:bg-[#e61d65] text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center gap-1.5"
          >
            {downloaded ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" /> Exported!
              </>
            ) : downloading ? (
              'Exporting...'
            ) : (
              'Download File'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
