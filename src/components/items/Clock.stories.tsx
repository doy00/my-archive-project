import type { Meta, StoryObj } from '@storybook/react';
import Clock from './Clock';

const meta: Meta<typeof Clock> = {
  title: 'Components/Clock',
  component: Clock,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '현재 시간을 실시간으로 표시하는 시계 컴포넌트입니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    format: {
      control: { type: 'select' },
      options: ['12', '24'],
      description: '시간 표시 형식을 선택합니다.'
    },
    className: {
      control: 'text',
      description: '컴포넌트에 추가할 CSS 클래스명입니다.'
    },
    style: {
      control: 'object',
      description: '인라인 스타일 객체입니다.'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '기본 12시간 형식으로 표시되는 시계입니다.'
      }
    }
  }
};

export const TwentyFourHour: Story = {
  args: {
    format: '24'
  },
  parameters: {
    docs: {
      description: {
        story: '24시간 형식으로 표시되는 시계입니다.'
      }
    }
  }
};

export const TwelveHour: Story = {
  args: {
    format: '12'
  },
  parameters: {
    docs: {
      description: {
        story: '12시간 형식(AM/PM)으로 표시되는 시계입니다.'
      }
    }
  }
};

export const CustomStyle: Story = {
  args: {
    style: {
      backgroundColor: '#f0f0f0',
      borderRadius: '8px',
      border: '2px solid #333',
      color: '#333'
    }
  },
  parameters: {
    docs: {
      description: {
        story: '커스텀 스타일이 적용된 시계입니다.'
      }
    }
  }
};

export const WithClassName: Story = {
  args: {
    className: 'custom-clock-class'
  },
  parameters: {
    docs: {
      description: {
        story: 'CSS 클래스가 적용된 시계입니다.'
      }
    }
  }
};

export const DifferentPositions: Story = {
  args: {
    style: {
      position: 'relative',
      backgroundColor: '#e8f4f8',
      padding: '20px',
      borderRadius: '10px'
    }
  },
  parameters: {
    docs: {
      description: {
        story: '다른 위치와 배경을 가진 시계입니다.'
      }
    }
  }
};