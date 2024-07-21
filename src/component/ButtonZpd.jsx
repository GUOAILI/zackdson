import { TinyColor } from '@ctrl/tinycolor';
import { Button, ConfigProvider, Space } from 'antd';
import React from 'react';
// const colors1 = ['#6253E1', '#04BEFE'];
// const colors2 = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
// const colors3 = ['#40e495', '#30dd8a', '#2bb673'];
const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

export default function ButtonZpd({onClick,title,htmlType,marginLeft,colorZpd}){
    return(
        <Space>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: `linear-gradient(116deg,  ${colorZpd.join(', ')})`,
                colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(colorZpd).join(', ')})`,
                colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(colorZpd).join(', ')})`,
                lineWidth: 0,
              },
            },
          }}
        >
          <Button style={{width:'8rem',marginBottom:'1rem',marginLeft:marginLeft }} 
            type="primary" onClick={onClick}
            htmlType={htmlType}
          >
            {title}
          </Button>
        </ConfigProvider>
      </Space>        
    )
}