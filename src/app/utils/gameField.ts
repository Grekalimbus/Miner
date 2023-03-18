export enum Mask {
    Transparent,
    Fill,
    Flag,
    Question,
  }
  
 export const mapMaskToView: Record<Mask, React.ReactNode> = {
    [Mask.Transparent]: '',
    [Mask.Fill]: '',
    [Mask.Flag]: '🚩',
    [Mask.Question]: '❓',
  };



  