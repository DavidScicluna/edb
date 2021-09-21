import { ReactElement } from 'react';

import { Wrap, WrapItem } from '@chakra-ui/react';
import { Controller, UseFormReturn } from 'react-hook-form';

import departments, { Department } from '../../../../common/data/departments';
import Button from '../../../../components/Clickable/Button';
import Card from '../../../Card';
import { Form } from '../../types';
import Genre from './components/Department';

const Departments = ({ form }: { form: UseFormReturn<Form> }): ReactElement => {
  const handleDepartmentClick = (department: Department): void => {
    const departments = form.getValues().departments;

    if (form.getValues().departments.some((activeDepartment) => activeDepartment.id === department.id)) {
      form.setValue(
        'departments',
        departments.filter((activeDepartment) => activeDepartment.id !== department.id),
        { shouldDirty: true }
      );
    } else {
      form.setValue('departments', [...departments, department], { shouldDirty: true });
    }
  };

  const handleAllClick = (): void => {
    if (form.getValues().departments.length === departments.length) {
      form.setValue('departments', [], { shouldDirty: true });
    } else {
      form.setValue('departments', [...departments], { shouldDirty: true });
    }
  };

  return (
    <Controller
      control={form.control}
      name='departments'
      render={({ field: { value } }) => (
        <Card box={{ header: { pb: 1.5 }, body: { pt: 1.5 } }} isFullWidth px={2} pt={1.5} pb={2}>
          {{
            header: {
              actions: (
                <Button onClick={() => handleAllClick()} size='sm' variant='text'>
                  {`${form.getValues().departments.length === departments.length ? 'Remove' : 'Select'} All`}
                </Button>
              ),
              title: 'Departments'
            },
            body: (
              <Wrap width='100%' spacing={1}>
                {departments.map((department) => (
                  <WrapItem key={department.id}>
                    <Genre
                      key={department.id}
                      {...department}
                      isActive={value.some((activeDepartment) => activeDepartment.id === department.id)}
                      onClick={handleDepartmentClick}
                    />
                  </WrapItem>
                ))}
              </Wrap>
            )
          }}
        </Card>
      )}
    />
  );
};

export default Departments;
