import variables from '@/assets/style/variables.module.scss';

export const useDesign = () => {
  const scssVariables = variables;
  const getPrefixCls = (scope: string) => {
    return `${scssVariables.namespace}-${scope}`;
  };

  return {
    variables: scssVariables,
    getPrefixCls,
  };
};
