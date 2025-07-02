import { HeaderConfig } from '@/hooks/use-mapa-print';

interface PrintHeaderProps {
  config?: HeaderConfig;
}

export const PrintHeader = ({ config }: PrintHeaderProps) => {
  if (!config) return null;

  return (
    <div className="print-header">
      <div className="print-header-content">
        {config.showLogo && config.logo && (
          <img 
            src={config.logo} 
            alt="Logo" 
            className="print-header-logo"
          />
        )}
        
        <div className="print-header-text">
          {config.title && (
            <h1 className="print-header-title">{config.title}</h1>
          )}
          {config.subtitle && (
            <p className="print-header-subtitle">{config.subtitle}</p>
          )}
          {config.company && (
            <p className="print-header-company">{config.company}</p>
          )}
        </div>
        
        {config.showDate && (
          <div className="print-header-date">
            {config.date || new Date().toLocaleDateString('pt-BR')}
          </div>
        )}
      </div>
    </div>
  );
};

export default PrintHeader; 