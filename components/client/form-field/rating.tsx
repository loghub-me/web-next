'use client';

import { FormControl, FormField, FormItem, FormMessage } from '@ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/select';
import StarIcon from '@ui/star-icon';
import { Control, Path } from 'react-hook-form';

interface RatingFormFieldProps<T extends { rating: number }> {
  control: Control<T>;
}

export default function RatingFormField<T extends { rating: number }>({ control }: RatingFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={'rating' as Path<T>}
      render={({ field }) => (
        <FormItem>
          <Select onValueChange={(value) => field.onChange(parseInt(value, 10))} defaultValue={field.value.toString()}>
            <FormControl>
              <SelectTrigger className="bg-card">
                <SelectValue placeholder="평점을 선택해주세요" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {[5, 4, 3, 2, 1].map((i) => (
                <SelectItem key={i} value={i.toString()}>
                  <div className="flex gap-0.5">
                    <StarIcon size={i} fill={true} />
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
